module Jekyll
  class EnvironmentVariablesGenerator < Generator

    def generate(site)
      site.config['env'] = ENV['JEKYLL_ENV'] || 'development'
      site.config['root_path'] = ENV['ROOT_PATH'] || '/'
    end

  end
end
