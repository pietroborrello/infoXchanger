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
    if params[:query] != nil
      query = params[:query][0]
      min_len = 5
      if query.length < min_len
        redirect_to root_path, flash: {:alert => "You have to insert at least #{min_len} characters to search for a user"}
      else
        @users = User.where('email LIKE ?', '%' + query + '%')
        if @users != nil && !@users.empty?
          render users_search_path
        else
          redirect_to root_path, flash: {:alert => 'No user found'}
        end
      end
    else
      redirect_to root_path, flash: {:alert => 'No user found'}
    end
  end
end
