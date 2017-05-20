class Users::PasswordsController < Devise::PasswordsController
  protected
    def after_resetting_password_path_for(resource)
      after_sign_in_path_for(resource)
    end
end
