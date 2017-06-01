class TokensController < ApplicationController

  def create
    info_str = "0 1 2 3 4 5 6 7 8 9 10 11 12"
    @user = current_user
    password = ''
    token_hash = SecureRandom.urlsafe_base64(18)
    @token = @user.tokens.create!(user: @user, password: password, info: info_str, token_hash: token_hash)
    redirect_to user_token_path(@user, @token)
  end

  def show
    @token = Token.find(params[:id])
    @qrlink = root_url + '?t=' + @token.token_hash
    @qr = RQRCode::QRCode.new( @qrlink, :size => 6, :level => :h )
  end
end
