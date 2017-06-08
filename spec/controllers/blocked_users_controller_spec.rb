require 'rails_helper'

RSpec.describe BlockedusersController, type: :controller do

	describe "PUT #update" do
		before :each do
			@blocker = FactoryGirl.create(:user, id: 0)
			@blocked = FactoryGirl.create(:user, id: 1, email: "fake@fake.com")
			sign_in @blocker
		end

		it "blocker blocks the blocked" do
			put :update, params: {user_id: @blocker.id, id: @blocked.id}
			expect(response).to redirect_to '/blockedusers/show'
		end
	end

	describe "DELETE #destroy" do
		before :each do
			@blocker = FactoryGirl.create(:user, id: 0)
			sign_in @blocker
			@blocked = FactoryGirl.create(:user, id: 1, email: "fake@fake.com")
			@block = FactoryGirl.create(:blocked_user, blocker: @blocker, blocked: @blocked)
		end
		
		it "unblock the user" do 
			delete :destroy, params: {id: @block, user_id: @blocker}
			expect(response).to redirect_to '/blockedusers/show'
			expect(BlockedUser.where(id: @block.id)).not_to exist
		end
	end
end
