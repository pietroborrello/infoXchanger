class ScannedtokensController < ApplicationController
  def scanned
    @tokens = ScannedToken.where(scanner: current_user)
  end
end
