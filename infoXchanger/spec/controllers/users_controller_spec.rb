require 'rails_helper'

RSpec.describe UsersController, type: :controller do
	
	describe "GET #show" do
		let(:user) {FactoryGirl.create(:user)}
		
		it "renders the :show template" do 
			get :show, params: { id: @user }
			expect render_template :show
		end
	end
	
	describe "PUT update" do
		
		before :each do
			@user = FactoryGirl.create(:user, first_name: "Lawrence", last_name: "Smith", email: "lawrence.smith@fake.com")
		end
		
		context "valid attributes" do
			it "changes @user's attributes" do
				put :update, params: { id: @user, user: FactoryGirl.attributes_for(:user, first_name: "Larry", last_name: "Smith", email: "larry.smith@fake.com")}
				@user.reload
				expect(@user.first_name).to eq("Larry")
				expect(@user.last_name).to eq("Smith")
				expect(@user.email).to eq("larry.smith@fake.com")
			end
			
			it "redirects to the updated user" do
				put :update, params: { id: @user, user: FactoryGirl.attributes_for(:user)}
				expect(response).to be_redirect
			end
		end
    end
end
