class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def myprofile
    @user = current_user
  end

  def users
    redirect_to users_myprofile_path
  end
end
