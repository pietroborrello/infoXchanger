class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    if @user == nil
      redirect_to root_path, flash: {:alert => 'No user found'}
    end
  end

  def myprofile
    @user = current_user
    if @user == nil
      redirect_to root_path, flash: {:alert => 'No user found'}
    end
  end

  def users
    redirect_to users_myprofile_path
  end

  def search
    username = params[:user].permit(:name)
    @users = User.where('email LIKE ?', '%' + username[:name] + '%')
    #render plain: @user.inspect
    if @users == nil
      redirect_to root_path, flash: {:alert => 'No user found'}
    else
      render users_search_path
    end
  end
end
