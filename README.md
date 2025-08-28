# DevOps Monitoring Stack (Docker Compose)

Stack monitoring berbasis Docker Compose yang terdiri dari **Prometheus (9091)**, **Grafana (3000)**, **Alertmanager (9194)**, **Node Exporter**, dan **NGINX Exporter**.  
Tujuannya untuk memantau performa server, service, dan aplikasi.

---

## Arsitektur

- **Prometheus** → mengumpulkan metrics
- **Node Exporter** → metrics host (CPU, RAM, Disk, Network)
- **NGINX Exporter** → metrics reverse proxy / web server
- **Alertmanager** → notifikasi alert
- **Grafana** → visualisasi dashboard

---

## Cara Menjalankan

```bash
cd compose
docker compose up -d
---

## Akses Layanan
- Grafana → http://localhost:3000 (admin / admin)
- Prometheus → http://localhost:9091/targets
- Alertmanager → http://localhost:9194

## Screenshots

### Docker ps → semua container UP
![Docker ps](./screenshots/docker%20compose%20ps.png)

### Prometheus targets
![Prometheus targets](./screenshots/prometheus%20target.png)

### Grafana dashboard
![Grafana dashboard](./screenshots/grafana%20dashboard.png)

### Node Exporter metrics
![Node Exporter](./screenshots/node%20exporter.png)

### NGINX Exporter metrics
![NGINX Exporter](./screenshots/nginx%20exporter.png)

## Relevansi
- Membuktikan kemampuan orkestrasi multi-container
- Observability end-to-end (metrics, alerting, visualization)
- Praktik nyata provisioning Grafana untuk dashboard reproducible
- Contoh project yang bisa dikembangkan untuk skala production
