// Variables

variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

// Main

resource "google_project_service" "firebase_api" {
  project = var.project_id
  service = "firebase.googleapis.com"

  disable_on_destroy = false
}

resource "google_firebase_project" "default" {
  provider = google-beta
  project  = var.project_id

  depends_on = [google_project_service.firebase_api]
}

resource "google_firebase_web_app" "default" {
  provider     = google-beta
  project      = var.project_id
  display_name = "${var.project_id}-web-app"

  depends_on = [google_firebase_project.default]
}

data "google_firebase_web_app_config" "default" {
  provider   = google-beta
  web_app_id = google_firebase_web_app.default.app_id
  project    = var.project_id
}

// Output

output "app_id" {
  description = "Firebase App ID"
  value       = google_firebase_web_app.default.app_id
}

output "api_key" {
  description = "Firebase API Key"
  value       = data.google_firebase_web_app_config.default.api_key
  sensitive   = true
}

output "auth_domain" {
  description = "Firebase Auth Domain"
  value       = data.google_firebase_web_app_config.default.auth_domain
}

output "project_id" {
  description = "Firebase Project ID"
  value       = var.project_id
}

output "storage_bucket" {
  description = "Firebase Storage Bucket"
  value       = data.google_firebase_web_app_config.default.storage_bucket
}

output "messaging_sender_id" {
  description = "Firebase Messaging Sender ID"
  value       = data.google_firebase_web_app_config.default.messaging_sender_id
}
