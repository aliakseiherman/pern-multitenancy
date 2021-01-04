CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    salt TEXT NOT NULL
);

CREATE UNIQUE INDEX users_username_index ON users (username);

CREATE TABLE tenants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE UNIQUE INDEX tenants_name_index ON tenants (name);

CREATE TABLE car_brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    about TEXT,
    tenant_id TEXT NOT NULL,
	CONSTRAINT fk_car_brands_tenants_tenant_id FOREIGN KEY (tenant_id) REFERENCES tenants (id)
);
