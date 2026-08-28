# FleetOps - Microservices Platform Repository

Part of the **FleetOps Fleet & Logistics Dispatch System**, submitted for the
Enterprise Cloud Architecture (ITS 2130) capstone project.

## Student Information
- **Name:** K.D. Chanuth Dewhan
- **Student ID:** 241722017
- **Slack Handle:** @chanuthdewhan
- **GCP Project ID:** fleet-ops-506803

## Project Description
FleetOps is a cloud-native microservice system for managing courier/delivery
dispatch operations — order creation, driver/vehicle assignment, real-time
trip tracking, proof-of-delivery capture, and notifications.

This repository is the **platform layer** — the shared infrastructure services
that every business microservice depends on: centralized configuration,
service discovery, and the API Gateway. It is structured as a parent
repository containing the following as Git submodules.

## Architecture Overview
- **Service Discovery:** Netflix Eureka (`service-registry`)
- **Configuration Management:** Spring Cloud Config Server, Git-backed
- **API Gateway:** Spring Cloud Gateway, single entry point for all client
  traffic, with JWT authentication enforced at the edge
- **Deployment model:** IaaS — Compute Engine, Managed Instance Groups,
  multi-zone for high availability, behind a Load Balancer

## Technology Stack
- Java 25, Spring Boot 4.1, Spring Cloud 2025.1.2
- Netflix Eureka, Spring Cloud Config, Spring Cloud Gateway
- JWT (jjwt) for authentication
- PM2 for process management on Compute Engine VMs
- Docker Compose for local development databases

## Submodules
| Module | Purpose |
|---|---|
| [service-registry](./service-registry) | Eureka service discovery — every other service registers here |
| [config-server](./config-server) | Centralized configuration, served from `config-repo` |
| [api-gateway](./api-gateway) | Single entry point, routes to business services, JWT validation |
| [config-repo](./config-repo) | Git-backed source of truth for all service configuration |

## Local Setup

```bash
git clone --recurse-submodules https://github.com/<your-username>/fleetops-platform.git
cd fleetops-platform
docker compose up -d          # starts local PostgreSQL + MongoDB
```

Start services in this order — each depends on the one before it being available:

1. `service-registry` (port 8761 / configured port) — confirm the Eureka
   dashboard loads before continuing
2. `config-server` — confirm it serves config for a known service name
3. `api-gateway` — confirm it registers with Eureka

## Live Deployment
- **GCP Project ID:** fleet-ops-506803
- **Region:** asia-southeast1
- **Backend Gateway URL:** http://34.21.225.166:80