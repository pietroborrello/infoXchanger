require 'rails_helper'

RSpec.describe ScannedtokensController, type: :controller do

  describe "GET #scanned" do
    it "returns http success" do
      get :scanned
      expect(response).to have_http_status(:success)
    end
  end

end
