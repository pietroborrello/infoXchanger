require 'rails_helper'

RSpec.describe UsersController, type: :controller do

	describe "GET #show" do
		before :each do
			@user = FactoryGirl.create(:user, id: 0, first_name: "Lawrence", last_name: "Smith", email: "lawrence.smith@fake.com")
			sign_in @user
		end

		it "renders the :show template" do
			get :show, params: { id: :user }
			expect(response).to render_template 'show'
		end
	end

	describe "PUT update" do

		before :each do
			@user = FactoryGirl.create(:user,id:0, first_name: "Lawrence", last_name: "Smith", email: "lawrence.smith@fake.com")
			sign_in @user
		end

		context "valid attributes" do
			it "changes @user's attributes" do
				put :update, params: { id: @user.id, user: {first_name: "Larry", last_name: "Smith", email: "larry.smith@fake.com"} }
				@user.reload
				expect(@user.first_name).to eq("Larry")
				expect(@user.last_name).to eq("Smith")
				expect(@user.email).to eq("larry.smith@fake.com")
			end

			it "redirects to the updated user" do
				put :update, params: { id: @user.id, user: FactoryGirl.attributes_for(:user)}
				expect(response).to redirect_to users_myprofile_url
			end
		end

		context "invalid attributes" do
			it "does not change @user's attributes" do
				put :update, params: {id: @user.id, user: {first_name: ''}}
				@user.reload
				expect(@user.first_name).to eq "Lawrence"
				expect(@user.last_name).to eq "Smith"
			end

			it "re-renders the edit method" do
			  put :update, params: {id: @user, user: FactoryGirl.attributes_for(:invalid_user)}
			  expect(response).to render_template 'edit'
			end
		end
    end

  describe "#search" do

		before :each do
			@user = FactoryGirl.create(:user, id: 0, first_name: "Lawrence", last_name: "Smith", email: "lawrence.smith@fake.com")
			sign_in @user
		end

		context "valid user" do
			it "find the searched user" do
				get :search, params: {query: ["Lawrence"]}
				expect(response).to render_template 'search'
				expect(assigns(:users)).to include(@user)
			end
		end
	end
end
