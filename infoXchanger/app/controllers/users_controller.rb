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

  def search
    username = params[:user].permit(:name)
    @user = User.where('email LIKE ?', '%' + username[:name] + '%')[0]
    #render plain: @user.inspect
    render users_show_path
  end
end
