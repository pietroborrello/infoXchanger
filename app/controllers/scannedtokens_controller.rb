class ScannedtokensController < ApplicationController
  def scanned
    @t = ScannedToken.where(scanner: current_user)
	@tokens = @t.reject { |token| BlockedUser.exists?(blocked: current_user, blocker: token.scanned_id)}
  end

  def whoscannedme
    @tokens = ScannedToken.where(scanned: current_user)
  end

  def show
    begin
      @token = Token.find_by(token_hash: params[:t])
      if !@token
        raise ActiveRecord::RecordNotFound
      end
      @qrlink = root_url + '?t=' + @token.token_hash
      @qr = RQRCode::QRCode.new( @qrlink, :size => ENV['QR_SIZE'].to_i, :level => :h )
      render 'tokens/show'
    rescue ActiveRecord::RecordNotFound => e
      redirect_to root_path, flash: {:alert => 'Token not valid'}
    rescue RQRCode::QRCodeRunTimeError => e
      redirect_to root_path, flash: {:alert => 'Token lenght not valid, please contact the administrator'}
    end
  end

end
