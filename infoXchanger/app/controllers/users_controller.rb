class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def edit
  	@user = User.find(params[:id])
  end

  def update
  	@user = User.find(params[:id])
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
  end

  def users
    redirect_to users_myprofile_path
  end

  private
  def user_params
  	params.require(:user).permit(:first_name,:last_name,:email,:address,:born_on,:born_at,:telephone,:website,:social_number,:id_number,:license_number,:insurance_company,:car_plate,:weight,:height,:blood_group,:image_url)
  end
end
