require 'rails_helper'

RSpec.describe BlockedusersController, type: :controller do

	describe "PUT #update" do
		before :each do
			@blocker = FactoryGirl.create(:user, id: 0)
			@blocked = FactoryGirl.create(:user, id: 1, email: "fake@fake.com")
			sign_in @blocker
		end

		it "blocker blocks the blocked" do
			put :update, params: {id: @blocker.id}
			expect(response).to redirect_to user_blockeduser_show_path
		end
	end

	describe "DELETE #destroy" do
		before :each do
			@block = FactoryGirl.create(:blocked_user)
		end
		
		it "unblock the user" do 
			delete :destroy, params: {block_id: @block.id}
			expect(response).to redirect_to root_path
			expect(BlockedUser.where(id: @block.id)).not_to exist
		end
	end
end
