INSERT INTO users (username, password, name, role_id) VALUES 
('jules', '$2y$13$solLsktT/MY4ZoMHpu/twO89Sn41nO3fg3fj31SDTSN2Oe/hvcGL6', 'jules', 1),
('yann', '$2y$13$hzJ0/befuo6PvDWi7iqIJ.UfVgd5eihnKt9wlOPfe4ajYs.JJKKMa', 'yann', 3);

INSERT INTO projects (name, user_id) VALUES
('API Gateway', 1),
('User Manager', 1),
('Monitoring Tool', 2);

INSERT INTO services (uuid, image, name, project_id, status_id) VALUES
(uuid_generate_v4(), 'nginx:latest', 'gateway-nginx', 1, 1),
(uuid_generate_v4(), 'node:20', 'gateway-api', 1, 2),

(uuid_generate_v4(), 'postgres:16', 'user-db', 2, 1),
(uuid_generate_v4(), 'node:20', 'user-api', 2, 2),

(uuid_generate_v4(), 'grafana/grafana', 'grafana', 3, 1),
(uuid_generate_v4(), 'prom/prometheus', 'prometheus', 3, 3);