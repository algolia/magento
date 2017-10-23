require 'nokogiri'

module Jekyll

  module TOCGenerator
    @@selector = 'h1, h2'

    def toc_generate(html)
      doc = Nokogiri::HTML(html)

      html = []
      hasChildren = false
      current_level = 1
      doc.css(@@selector).each do |tag|
        level = tag.name[1].to_i
        if level > current_level
          current_level.upto(level - 1) do
            html << '<ul class="toc_menu">'
            hasChildren = true
          end
        elsif level < current_level
          level.upto(current_level - 1) do
            html << '</ul></li>'
          end
        else
          html << '</li>'
        end
        html << "<li><a href=\"##{tag['id']}\">#{tag.text}</a>"
        current_level = level
      end

      html << '</li>'
      if hasChildren
        html << '</ul>'
      end
      html.join
    end
    
    def toc_events(html)
        doc = Nokogiri::HTML(html)
	    html = []
	    
	    html << '<ul class="toc_menu">'
	    doc.css('h4').each do |tag|
	      html << "<li><a href=\"##{tag['id']}\">#{tag.text}</a></li>"
	    end
	
	    html << '</ul>'
	    
	    html.join
    end

    def toc_generate_menu(html)
      doc = Nokogiri::HTML(html)

      html = []
      html << '<select>'
      current_level = 1
      doc.css(@@selector).each do |tag|
        level = tag.name[1].to_i
        html << "<option value=\"##{tag['id']}\">#{tag.text}</option>"
        current_level = level
      end

      html << '</select>'

      html.join
    end
  end

end

Liquid::Template.register_filter(Jekyll::TOCGenerator)
