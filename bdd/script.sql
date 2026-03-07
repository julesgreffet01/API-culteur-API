CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  libelle VARCHAR(100) NOT NULL
);

CREATE TABLE "status" (
  id SERIAL PRIMARY KEY,
  libelle VARCHAR(100) NOT NULL
);

CREATE TABLE ports (
  id SERIAL PRIMARY KEY,
  libelle VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE monitorings (
  id SERIAL PRIMARY KEY,
  libelle VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name VARCHAR(100),
  role_id INT NOT NULL REFERENCES roles(id)
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  user_id INT NOT NULL REFERENCES users(id)
);

CREATE TABLE services (
  uuid TEXT PRIMARY KEY,
  image VARCHAR(100),
  started_since TIMESTAMP NOT NULL DEFAULT now(),
  name VARCHAR(50) NOT NULL,
  project_id INT NOT NULL REFERENCES projects(id),
  status_id INT NOT NULL REFERENCES "status"(id)
);

CREATE TABLE services_ports (
  port_id INT NOT NULL REFERENCES ports(id),
  service_uuid TEXT NOT NULL REFERENCES services(uuid),
  PRIMARY KEY (port_id, service_uuid)
);

CREATE TABLE monitorings_services (
  id SERIAL PRIMARY KEY,
  monitoring_id INT NOT NULL REFERENCES monitorings(id),
  service_uuid TEXT NOT NULL REFERENCES services(uuid),
  min_value INT,
  max_value INT,
  UNIQUE (monitoring_id, service_uuid)
);

CREATE TABLE measures (
  id SERIAL PRIMARY KEY,
  monitoring_service_id INT NOT NULL REFERENCES monitorings_services(id),
  value INT NOT NULL,
  measured_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  ip VARCHAR(16) NOT NULL,
  user_id INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now()
);

CREATE USER user_manager WITH PASSWORD 'password';
GRANT CONNECT ON DATABASE db_api_culteur TO user_manager;
GRANT USAGE ON SCHEMA public TO user_manager;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.users TO user_manager;
GRANT USAGE, SELECT ON SEQUENCE public.users_id_seq TO user_manager;

CREATE USER user_docker WITH PASSWORD 'password';
GRANT CONNECT ON DATABASE db_api_culteur TO user_docker;
GRANT USAGE ON SCHEMA public TO user_docker;
GRANT INSERT, UPDATE, DELETE ON TABLE public.services TO user_docker;

CREATE USER user_api WITH PASSWORD 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO user_api;
REVOKE INSERT, UPDATE, DELETE ON TABLE public.users FROM user_manager;
REVOKE INSERT, UPDATE, DELETE ON TABLE public.services FROM user_manager;

INSERT INTO roles (libelle) values ('admin'), ('dev_ops'), ('developer');
INSERT INTO "status" (libelle) values ('up'), ('starting'), ('stop'), ('down');