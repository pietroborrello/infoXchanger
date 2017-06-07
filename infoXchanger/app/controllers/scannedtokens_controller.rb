class ScannedtokensController < ApplicationController
  def scanned
    @tokens = ScannedToken.where(scanner: current_user)
  end

  def showLinkToken
    begin
      @token = Token.find(params[:id])
      @qrlink = root_url + '?t=' + @token.token_hash
      @qr = RQRCode::QRCode.new( @qrlink, :size => 6, :level => :h )
    rescue ActiveRecord::RecordNotFound => e
      redirect_to root_path, flash: {:alert => 'Token not valid'}
    rescue RQRCode::QRCodeRunTimeError => e
      redirect_to root_path, flash: {:alert => 'Token lenght not valid, please contact the administrator'}
    end
  end

  def whoscannedme
    @tokens = ScannedToken.where(scanned: current_user)
  end


end
