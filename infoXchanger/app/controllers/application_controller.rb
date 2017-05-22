class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!



  protected
    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :email, :password, :password_confirmation])
        devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :email, :password, :current_password])
   end

   def after_sign_in_path_for(resource)
     sign_in_url = new_user_session_url
     sign_up_url = new_user_registration_url
     if request.referer == sign_in_url || request.referer == sign_up_url
       users_myprofile_path
       #super
     else
       request.env['omniauth.origin'] || stored_location_for(resource) || request.referer || root_path
     end
   end

end
