class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user! unless Rails.env.test?

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to main_app.root_path, :alert => exception.message
  end
  rescue_from ActionController::InvalidAuthenticityToken do |exception|
    redirect_to main_app.root_path, :alert => exception.message
  end



  protected
    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :email, :password, :password_confirmation])
        devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :email, :password, :current_password])
   end

   def after_sign_in_path_for(resource)
       stored_location_for(resource) || root_path
   end

end
