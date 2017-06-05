require 'rails_helper'

RSpec.describe TokensController, type: :controller do

	describe "POST #create" do
		before :each do
			@user = FactoryGirl.create(:user, id: 0)
			sign_in @user
		end

		it "creates a new token for the user" do
			post :create, params: {user_id:0, address: 1, born_on:1, born_at:1}
			expect(response).to redirect_to user_token_url(@user.id, 1)
		end
	end

	describe "GET #show" do
		before :each do
			@user = FactoryGirl.create(:user)
			sign_in @user
			@token = FactoryGirl.create(:token, user: @user)
		end

		it "renders the :show template" do
			get :show, params: { id: @token.id, user_id: @user.id}
			expect(response).to render_template 'show'
		end
	end

end
