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
  monitoring_id INT NOT NULL REFERENCES monitoring(id),
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