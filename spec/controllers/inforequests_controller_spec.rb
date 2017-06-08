require 'rails_helper'

RSpec.describe InforequestsController, type: :controller do

  describe "GET #show" do
    it "returns http success" do
      get :show
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST #ask" do
	before :each do
		@asker = FactoryGirl.create(:user, id: 0)
		@asked = FactoryGirl.create(:user, id: 1, email: "fake@fake.com")
		sign_in @asker
	end

	it "asker asks info to asked" do
		get :select, params: {id: @asked.id}
		post :ask, params: {asker: @asker.id, asked: @asked.id, info:"012"}
		expect(response).to redirect_to root_path
	end
  end

end
