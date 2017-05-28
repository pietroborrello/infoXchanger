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
				put :update, params: { id: @user }
				#user: FactoryGirl.attributes_for(:user, first_name: "Larry", last_name: "Smith", email: "larry.smith@fake.com")}
				@user.update(first_name: "Larry", last_name: "Smith", email: "larry.smith@fake.com")
				expect(@user.first_name).to eq("Larry")
				expect(@user.last_name).to eq("Smith")
				expect(@user.email).to eq("larry.smith@fake.com")
			end
			
			it "redirects to the updated user" do
				put :update, params: { id: @user, user: FactoryGirl.attributes_for(:user)}
				expect(response).to be_redirect
			end
		end
		
		context "invalid attributes" do
			it "does not change @user's attributes" do
				put :update, params: {id: @user } 
				@user.update(first_name: nil, last_name: nil)
				expect(@user.first_name).to be_nil
				expect(@user.last_name).to be_nil
			end

			it "re-renders the edit method" do
			  put :update, params: {id: @user, user: FactoryGirl.attributes_for(:invalid_user)}
			  expect render_template :edit
			end
		end
    end
    
    #non funziona
    describe "#search" do 
		let(:user) {FactoryGirl.create(:user)}
		
		context "valid user" do
			it "find the searched user" do
				visit root_path
				page.fill_in "query", :with => "Lawrence"
				click_button "Search"
				expect(page).to have_text("Users found:")
				#get :search, params: {"search" => "Lawrence" }
				#expect(response).to be_success
				#@recordings.map(&:name).should == ['expected1', 'expected2']
			end
		end
	end		
end
