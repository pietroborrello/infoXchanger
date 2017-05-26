class TokensController < ApplicationController
  @info =
  [:email,
  :first_name,
  :last_name,
  :address,
  :born_on,
  :born_at,
  :telephone,
  :website,
  :social_number,
  :id_number,
  :license_number,
  :car_plate,
  :weight,
  :height,
  :blood_group,
  :image_url]

  def create
    info_str = "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15"
    @user = current_user
    @token = @user.tokens.create(user: @user, password: '', info: info_str)
    redirect_to user_token_path(@user, @token)
  end

  def show
    @token = Token.find(params[:id])
    @qrlink = 'www.localhost.com/' + @token.id.to_s
    @qr = RQRCode::QRCode.new( @qrlink, :size => 5, :level => :h )
  end
end
