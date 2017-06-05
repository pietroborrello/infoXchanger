class ScannedtokensController < ApplicationController
  def scanned
    @t = ScannedToken.where(scanner: current_user)
	@tokens = @t.reject { |token| BlockedUser.exists?(blocked: current_user) && BlockedUser.exists?(blocker: token.scanned_id)}
  end

  def whoscannedme
    @tokens = ScannedToken.where(scanned: current_user)
  end
end
