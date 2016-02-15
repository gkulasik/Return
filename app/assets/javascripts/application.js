// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require turbolinks
//= require_tree .


var score = { turns_count: 0, food_count: 0, water_count: 0, ore_count: 0, unit_count: 0, unit_reserve_count: 0, unit_reserve_generation_count: 0 };

    var FOOD = "food", 
        WATER = "water",
        ORE = "ore",
        UNIT = "unit",
        RESERVE = "reserve",
        GENERATION = "generation",
        TURNS = "turns";
      
      function adjustCount(field, adjustment) {
         switch(field) {
            case FOOD:
                score.food_count += adjustment;
                if(score.food_count < 0) score.food_count = 0;
                return score.food_count;
            case WATER:
                score.water_count += adjustment;
                if(score.water_count < 0) score.water_count = 0;
                return score.water_count;
            case ORE:
                score.ore_count += adjustment;
                if(score.ore_count < 0) score.ore_count = 0;
                return score.ore_count;
            case UNIT:
                score.unit_count += adjustment;
                if(score.unit_count < 0) score.unit_count = 0;
                if(score.unit_count < score.unit_reserve_count) adjust(RESERVE, score.unit_count - score.unit_reserve_count);
                return score.unit_count;
            case RESERVE:
                score.unit_reserve_count += adjustment;
                if(score.unit_reserve_count < 0) score.unit_reserve_count = 0;
                generation_calc();
                return score.unit_reserve_count;
            case GENERATION:
                score.unit_reserve_generation_count = Math.floor(score.unit_reserve_count * .25);
                return score.unit_reserve_generation_count;
            default:
            // do nothing
        } 
      };


function adjust(fieldToAdjust, amount) {
        var adjusted = adjustCount(fieldToAdjust, amount);
        document.getElementById(fieldToAdjust).innerHTML = adjusted;
    };

function generation_calc(){
        var amount = adjustCount(GENERATION, 0); // second param not used for this adjustment
        document.getElementById(GENERATION).innerHTML = "+" + amount;
    };

function add_reserve_generated_units(){
        adjust(UNIT, score.unit_reserve_generation_count);
    };
    
function nurish_units(){
        var isDeficiency = false;
        var toDie = 0;
        if(score.unit_count > score.food_count || score.unit_count > score.water_count){
            isDeficiency = true;
            var definciency = 0;
            // user water count (is less)
            if(score.food_count > score.water_count){ definciency = score.unit_count - score.water_count; }
            // food_count <= water_count (use food count is less or equal, so it doesn't matter which is used)
            else { definciency = score.unit_count - score.food_count; }
           toDie = Math.ceil(definciency*0.25);
           document.getElementById("toDie_msg").innerHTML = "Kill " + toDie + " unit(s)";
        }
        // Adjust food/water 1st
        adjust(FOOD, -score.unit_count);
        adjust(WATER, -score.unit_count);
        
        if(isDeficiency){
            adjust(UNIT, -toDie);
        }
    };
    
function complete_turn(){
    $( ".error" ).remove();
    var valid = true;
    
    if (!$('#play_check').is(':checked')){
        valid = false;
        turn_error("Must verify you played.")
    }
    if (!$('#resource_sub_check').is(':checked')){
        valid = false;
        turn_error("Must verify that resources used.")
    }
    if (!$('#resource_add_check').is(':checked')){
        valid = false;
        turn_error("Must verify that resources gathered.")
    }
    if (!$('#reserve_check').is(':checked')){
        valid = false;
        turn_error("Must verify that added units from reserve.")
    }
    if (!$('#miracle_disaster_check').is(':checked')){
        valid = false;
        turn_error("Must verify miracle/disaster effect implemented.")
    }
    if(valid){
        $('#miracle_disaster_check').prop('checked', false);
        $('#reserve_check').prop('checked', false);
        $('#resource_add_check').prop('checked', false);
        $('#resource_sub_check').prop('checked', false);
        $('#play_check').prop('checked', false);
        score.turns_count += 1;
        document.getElementById(TURNS).innerHTML = score.turns_count;
        document.getElementById("toDie_msg").innerHTML = "";
    }
};

function turn_error(error){
  $( "<p class='error', style='color:red;'>Error: " + error +"</p>" ).insertAfter( "#turn_order_header" );  
};


$(function(){ $(document).foundation(); });
