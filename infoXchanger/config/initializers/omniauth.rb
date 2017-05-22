Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV["491807312611-k9eiknbkb8gk6vj4u1cb9k24e6e40186.apps.googleusercontent.com"], ENV["W6yTddmyT1yRLBVGpzNIKG9W"]
end
