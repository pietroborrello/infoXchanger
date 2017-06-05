class TokensController < ApplicationController

  @@info =
  [:address,
  :born_on,
  :born_at,
  :telephone,
  :website,
  :social_number,
  :id_number,
  :license_number,
  :car_plate,
  :insurance_company,
  :weight,
  :height,
  :blood_group]

  def create
    info_str = ""
    @@info.each do |info|
      if params[info] != nil
        info_str << @@info.index(info).to_i.to_s << " "
      end
    end
    #info_str = "0 1 2 3 4 5 6 7 8 9 10 11 12"
    @user = current_user
    password = ''
    token_hash = SecureRandom.urlsafe_base64(18)
    begin
      @token = @user.tokens.create!(user: @user, password: password, info: info_str, token_hash: token_hash)
      redirect_to user_token_path(@user, @token)
    rescue ActiveRecord::RecordNotUnique => e
      redirect_to root_path, flash: {:alert => 'Token creation failed, please retry'}
    end
  end

  def show
    begin
      @token = Token.find(params[:id])
      authorize! :show, @token
      @qrlink = root_url + '?t=' + @token.token_hash
      @qr = RQRCode::QRCode.new( @qrlink, :size => 6, :level => :h )
    rescue ActiveRecord::RecordNotFound => e
      redirect_to root_path, flash: {:alert => 'Token not valid'}
    rescue RQRCode::QRCodeRunTimeError => e
      redirect_to root_path, flash: {:alert => 'Token lenght not valid, please contact the administrator'}
    end
  end
  
  def mytokens
	@tokens = Token.where(user: current_user)
	@info = @@info
  end
  
  def destroy
	@scan_token = ScannedToken.find_by(token_id: params[:id])
	if @scan_token
		@scan_token.destroy
	end
	Token.find(params[:id]).destroy
	redirect_to :tokens_mytokens
  end
end
