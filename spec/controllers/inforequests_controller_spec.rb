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
  		post :ask, params: {asked: @asked.id, address: "1", born_on: "1", born_at:"1"}
      expect(Inforequest.where(asker: @asker, asked: @asked, info:"0 1 2 ")).to exist
  		expect(response).to redirect_to root_path
  	end
  end

  describe "POST #reply" do

      before :each do
    		@asker = FactoryGirl.create(:user, id: 0)
    		@asked = FactoryGirl.create(:user, id: 1, email: "fake@fake.com")
        @inforequest = FactoryGirl.create(:inforequest, asker: @asker, asked: @asked)
    		sign_in @asked
    	end

    context "with deny" do
      it "should destroy the info request denied" do
        post :reply, params: {id: @inforequest.id, reply: "deny"}
        expect(Inforequest.where(id: @inforequest.id)).not_to exist
      end
    end

    context "with allow" do
      it "should create a scanned token for the request allowed with the right info" do
        post :reply, params: {id: @inforequest.id, reply: "allow"}
        expect(Inforequest.where(id: @inforequest.id)).not_to exist
        expect(ScannedToken.find_by(scanner: @inforequest.asker, scanned: @inforequest.asked).token.info).to eq(@inforequest.info)
      end
    end
  end

end
