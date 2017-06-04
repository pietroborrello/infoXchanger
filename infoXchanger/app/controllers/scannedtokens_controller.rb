class ScannedtokensController < ApplicationController
  def scanned
    @tokens = ScannedToken.where(scanner: current_user)
  end

  def whoscannedme
    @tokens = ScannedToken.where(scanned: current_user)
  end
end
