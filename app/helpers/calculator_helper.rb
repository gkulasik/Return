module CalculatorHelper
    
    BUTTON_CLASS = "small button"
    
    def add_sub_button_bar(field, value)
        #byebug
        content_tag(:div, class: "button-bar") do
           concat op_button_group(field, "+", value)
           concat op_button_group(field, "-", value)
        end
    end
    
    def op_button_group(field, sign, values)
        #byebug
        content_tag(:ul, class: "button-group") do
            values.each do |v|
               concat  content_tag(:li, "#{sign}#{v}", class: BUTTON_CLASS, onclick: "adjust('"+field+"', #{sign}#{v});")
            end
        end
    end
    
    def turns_display
        "<div class=\"row\">
            <div class=\"small-3 columns\">
                <strong>
                    <div class=\"row\">
                        <div class=\"small-6 columns\">
                          Turns:
                        </div>
                        <div id=\"turns\" class=\"small-6 columns\">
                           0
                        </div>
                    </div>
                </strong>
            </div> 
            <div class=\"small-9 columns\"></div>
        </div>".html_safe
    end
    
    def generation_display
       "<div class=\"row\">
                <div class=\"small-offset-1 small-3 columns\">
                  Generation effect:
                </div>
                <div id=\"generation\" class=\"small-3 columns\">
                   0
                </div>
                <div class=\"small-5 columns\">
                </div>
            </div>".html_safe 
    end
end
