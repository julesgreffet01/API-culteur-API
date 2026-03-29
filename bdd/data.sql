INSERT INTO users (username, password, name, role_id) VALUES 
('jules', '$2y$13$solLsktT/MY4ZoMHpu/twO89Sn41nO3fg3fj31SDTSN2Oe/hvcGL6', 'jules', 1),
('yann', '$2y$13$hzJ0/befuo6PvDWi7iqIJ.UfVgd5eihnKt9wlOPfe4ajYs.JJKKMa', 'yann', 3);

INSERT INTO projects (name, user_id) VALUES
('API Gateway', 1),
('User Manager', 1),
('Monitoring Tool', 2);

INSERT INTO services (uuid, image, name, project_id, status_id) VALUES
('059ba85a-e341-467a-8463-867d85d84551', 'nginx:latest', 'gateway-nginx', 1, 1),
(uuid_generate_v4(), 'node:20', 'gateway-api', 1, 2),

('b75c2c80-a4f8-40a0-a30d-3da584cb6732', 'postgres:16', 'user-db', 2, 1),
('e06e56e6-3854-43fd-b706-1398dceddfee', 'node:20', 'user-api', 2, 2),

(uuid_generate_v4(), 'grafana/grafana', 'grafana', 3, 1),
(uuid_generate_v4(), 'prom/prometheus', 'prometheus', 3, 3);

INSERT INTO monitorings (id, libelle) VALUES (1,'CPU'), (2, 'RAM');

INSERT INTO monitorings_services (id, monitoring_id, service_uuid, min_value, max_value) VALUES
(1,1,'059ba85a-e341-467a-8463-867d85d84551', 0,100),
(2,2,'059ba85a-e341-467a-8463-867d85d84551',0,100),
(3,1,'b75c2c80-a4f8-40a0-a30d-3da584cb6732',0,100),
(4,2,'b75c2c80-a4f8-40a0-a30d-3da584cb6732',0,100),
(5,1,'e06e56e6-3854-43fd-b706-1398dceddfee',0,100),
(8,2,'e06e56e6-3854-43fd-b706-1398dceddfee',0,100);


INSERT INTO measures (monitoring_service_id, value, measured_at) VALUES
-- Monitoring Service 1
(1, 12, NOW() - INTERVAL '2 days'),
(1, 15, NOW() - INTERVAL '8 minutes'),
(1, 14, NOW() - INTERVAL '5 minutes'),

-- Monitoring Service 2
(2, 30, NOW() - INTERVAL '12 minutes'),
(2, 28, NOW() - INTERVAL '7 minutes'),
(2, 35, NOW() - INTERVAL '3 minutes'),

-- Monitoring Service 3
(3, 50, NOW() - INTERVAL '15 minutes'),
(3, 55, NOW() - INTERVAL '10 minutes'),
(3, 53, NOW() - INTERVAL '2 minutes'),

-- Monitoring Service 4
(4, 70, NOW() - INTERVAL '20 minutes'),
(4, 65, NOW() - INTERVAL '10 minutes'),
(4, 68, NOW() - INTERVAL '1 minute'),

-- Monitoring Service 5
(5, 90, NOW() - INTERVAL '25 minutes'),
(5, 85, NOW() - INTERVAL '15 minutes'),
(5, 88, NOW() - INTERVAL '5 minutes'),

-- Monitoring Service 8
(8, 110, NOW() - INTERVAL '30 minutes'),
(8, 105, NOW() - INTERVAL '20 minutes'),
(8, 115, NOW() - INTERVAL '10 minutes');