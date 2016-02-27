class ScoresController < ApplicationController
    
    def create
      @score = Score.new score_params
      if @score.save
        render :json => { id: @score.id, result: "Saved." } 
      else
        render :json => { id: "None", result: "Could not save." }
      end
    end
    
    def update
        @score = Score.find_by_id(params[:id])
        if @score.update(score_params)
            render :json => { id: @score.id, result: "Updated to turn #{@score.turns}." } 
        else
            render :json => { id: @score.id, result: "Could not save." }
        end
    end
    
    def show
        @score = Score.find_by(id: params[:id])
        if(@score != nil)
            render :json => { 
            id: @score.id,    
            turns: @score.turns, 
            food: @score.food, 
            water: @score.water,
            ore: @score.ore,
            units: @score.units,
            reserve: @score.reserve,
            unit_reserve_generation: @score.unit_reserve_generation,
            result: "Restore successful!"
            }
        else
           render :json => { id: "None", result: "Could not find save for id: #{params[:id]}." }
        end
    end
    
    
    private 
    def score_params
      params.require(:score).permit(:id, :turns, :food, :water, :ore, :units, :reserve, :unit_reserve_generation)
    end
end