class InforequestsController < ApplicationController

  def show
    @requests = [{asker: 1, asked: current_user.id, info: '4 5 6 7'},{asker: 1, asked: current_user.id, info: '4 5 6 7'}]
    #@requests = Inforequest.where(asked: current_user)
  end
	
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
	  
	@@asked = nil
  
	def select
		@@asked = User.find(params[:id])
		render inforequests_select_path
	end

	def ask
		info_str = ""
		@@info.each do |info|
		  if params[info] != nil
			info_str << @@info.index(info).to_i.to_s << " "
		  end
		end
		Inforequest.create!(asker: current_user, asked: @@asked, info: info_str)
		redirect_to root_path, notice: "Information successfully sent"
	end

end
