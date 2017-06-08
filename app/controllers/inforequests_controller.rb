class InforequestsController < ApplicationController

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

  def show
    @requests = Inforequest.where(asked: current_user)
    @info = @@info
  end

  def reply
    begin
      @request = Inforequest.find(params[:id])
      authorize! :destroy, @request
      if params[:reply] == "deny"
        Inforequest.destroy(params[:id])
      elsif params[:reply] == "allow"
        token_hash = SecureRandom.urlsafe_base64(18)
        @token = current_user.tokens.create!(user: current_user, password: '', info: @request.info, token_hash: token_hash)
        ScannedToken.create(scanner: @request.asker, scanned: current_user, token: @token)
        Inforequest.destroy(params[:id])
      end
    rescue ActiveRecord::RecordNotFound => e
      redirect_to root_path, flash: {:alert => 'Request not valid'} and return
    rescue ActiveRecord::RecordNotUnique => e
      redirect_to root_path, flash: {:alert => 'Token creation failed, please retry'} and return
    end
    redirect_to inforequests_show_path
  end

	def select
	end

	def ask
    begin
  		asked = User.find(params[:asked])
    rescue ActiveRecord::RecordNotFound => e
      redirect_to root_path, flash: {:alert => 'Request not valid'}
    end
		info_str = ""
		@@info.each do |info|
		  if params[info] != nil
			     info_str << @@info.index(info).to_i.to_s << " "
		  end
		end
    if info_str == ""
      redirect_to root_path, alert: "Request not valid"
    elsif !BlockedUser.exists?(blocked: current_user, blocker: asked)
      Inforequest.create!(asker: current_user, asked: asked, info: info_str)
      redirect_to root_path, notice: "Information successfully sent"
    else
      redirect_to root_path, alert: "User not found"
    end
	end

end
