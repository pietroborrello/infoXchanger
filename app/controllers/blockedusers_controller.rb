class BlockedusersController < ApplicationController
	def show
		@blocks = BlockedUser.where(blocker: current_user)
	end
	
	def destroy #unblock
		authorize! :destroy, current_user
		@unblock = BlockedUser.find(params[:id])
		@unblock.destroy
		redirect_to :blockedusers_show
	end
	
	def update #block
		@user = User.find(params[:id])
		if BlockedUser.exists?(blocker: current_user, blocked: @user)
			redirect_to :blockedusers_show, alert: "The user has yet been blocked"
		else
			BlockedUser.create!(blocker: current_user, blocked: @user)
			redirect_to :blockedusers_show
		end
	end
end
