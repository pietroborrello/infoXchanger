class BlockedusersController < ApplicationController
	def show
	end
	
	def block
		redirect_to :blockedusers_show
	end
end
