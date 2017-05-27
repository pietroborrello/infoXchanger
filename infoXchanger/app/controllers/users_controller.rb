class UsersController < ApplicationController

  @@info =
  [:address,
  :born_on,
  :born_at,
  :telephone,
  :website,
  :social_number,
  :id_number,
  :license_number,
  :car_plate,
  :insurance_company,
  :weight,
  :height,
  :blood_group]

  def show
    begin
      if !params[:t]
        @user = User.find(params[:id])
        @token = nil
      else
        @token = Token.find_by(token_hash: params[:t])
        if !@token
          raise ActiveRecord::RecordNotFound
        end
        @user = User.find(@token.user_id)
        @info = @@info
      end
    rescue ActiveRecord::RecordNotFound => e
      redirect_to root_path, flash: {:alert => 'No user found'}
    end
  end

  def edit
    begin
      @user = User.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      redirect_to root_path, flash: {:alert => 'No user found'}
    end
  end

  def update
    begin
      @user = User.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      redirect_to root_path, flash: {:alert => 'No user found'}
    end
  	if @user.update_attributes(user_params)
  		flash[:success] = "Profile updated"
  		redirect_to users_myprofile_path
  	else
      flash[:alert] = "Please Retry"
  		render 'edit'
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
      min_len = 3
      if query.length < min_len
        redirect_to root_path, flash: {:alert => "You have to insert at least #{min_len} characters to search for a user"}
      else
        query = query.split(' ')
        @users = User.where('first_name IN (?) OR last_name IN (?) OR email IN (?)', query, query, query)
        query.each do |query|
          res = User.where('first_name LIKE ? OR last_name LIKE ? OR email LIKE ?', '%' + query + '%', '%' + query + '%', '%' + query + '%')
          @users = @users.or(res)
        end
        if !@users.empty?
          render users_search_path
        else
          redirect_to root_path, flash: {:alert => 'No user found'}
        end
      end
    else
      redirect_to root_path, flash: {:alert => 'No user found'}
    end
  end

private
  def user_params
    params.require(:user).permit(:first_name,:last_name,:email,:address,:born_on,:born_at,:telephone,:website,:social_number,:id_number,:license_number,:insurance_company,:car_plate,:weight,:height,:blood_group,:image_url)
  end
end
