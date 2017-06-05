class ScannedtokensController < ApplicationController
  def scanned
    @tokens = ScannedToken.where(scanner: current_user)


  end
  def share
    @tokens = ScannedToken.where(scanner: current_user)
    @user = User.find(params[:id])


  end

  def whoscannedme
    @tokens = ScannedToken.where(scanned: current_user)
  end


end
