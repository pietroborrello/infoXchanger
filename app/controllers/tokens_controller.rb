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
    @user = current_user
    token_hash = SecureRandom.urlsafe_base64(18)

    if params[:password] && params[:password]!=''
      password = BCrypt::Password.create(params[:password]).to_s
    else
      password = ''
    end
    begin
      @token = @user.tokens.create!(user: @user, password: password, info: info_str, token_hash: token_hash)
      redirect_to user_token_path(@user, @token)
    rescue ActiveRecord::RecordNotUnique => e
      redirect_to root_path, flash: {:alert => 'Token creation failed, please retry'}
    end
  end

  def password
    render 'password', t: params[:t]
  end

  def auth
    @token = Token.find_by(token_hash: params[:t])
    if !@token
      redirect_to root_path, flash: {:alert => 'Token not valid'}
    elsif !params[:password] || params[:password][0] == ""
      redirect_to tokens_password_path(t: params[:t]), flash: {alert: 'You have to insert a password'} and return
    end

    password = params[:password][0]
    begin
      if BCrypt::Password.new(@token.password) != password
        redirect_to tokens_password_path(t: params[:t]), flash: {alert: 'Wrong Password'} and return
      end
      @user = User.find(@token.user_id)
      if @user != current_user
        ScannedToken.create(scanner: current_user, scanned: @user, token: @token)
      end
      redirect_to users_show_path t: params[:t] and return
    rescue BCrypt::Errors::InvalidHash => e
      redirect_to root_path, flash: {:alert => 'broken Token, please contact the administrator'} and return
    rescue ActiveRecord::RecordNotFound => e
      redirect_to root_path, flash: {:alert => 'No user found'} and return
    end

  end

  def show
    begin
      @token = Token.find(params[:id])
      authorize! :show, @token
      @qrlink = root_url + '?t=' + @token.token_hash
      @qr = RQRCode::QRCode.new( @qrlink, :size => ENV['QR_SIZE'].to_i, :level => :h )
    rescue ActiveRecord::RecordNotFound => e
      redirect_to root_path, flash: {:alert => 'Token not valid'}
    rescue RQRCode::QRCodeRunTimeError => e
      redirect_to root_path, flash: {:alert => 'Token lenght not valid, please contact the administrator'}
    end
  end

  def mytokens
  	@tokens = Token.where(user: current_user).order('created_at desc')
  	@info = @@info
  end

  def destroy
    @token = Token.find(params[:id])
    authorize! :destroy, @token
    @scan_token = ScannedToken.find_by(token_id: params[:id])
    if @scan_token
    	@scan_token.destroy
    end
    @token.destroy
    redirect_to :tokens_mytokens
    end
end
