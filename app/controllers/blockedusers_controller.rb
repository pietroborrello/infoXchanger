class BlockedusersController < ApplicationController
	def show
		@blocks = BlockedUser.where(blocker: current_user)
	end

	def destroy #unblock
		begin
			@unblock = BlockedUser.find(params[:id])
			authorize! :destroy, @unblock
			@unblock.destroy
			redirect_to :blockedusers_show
		rescue ActiveRecord::RecordNotFound => e
      redirect_to root_path, flash: {:alert => 'No user found'} and return
    end
	end

	def update #block
		begin
			@user = User.find(params[:id])
		rescue ActiveRecord::RecordNotFound => e
			redirect_to root_path, flash: {:alert => 'No user found'} and return
		end
		if BlockedUser.exists?(blocker: current_user, blocked: @user)
			redirect_to :blockedusers_show, alert: "The user has yet been blocked"
		else
			BlockedUser.create!(blocker: current_user, blocked: @user)
			redirect_to :blockedusers_show
		end
	end
end
