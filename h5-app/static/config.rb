
#===== cdn =====#
# http_images_path = "http://www.cdn.xxx/files/"
# http_fonts_path = "http://www.cdn.xxx/files/fonts/"
# output_style = :compressed



#===== local =====#
relative_assets = true


if RUBY_VERSION.to_f >= 1.9
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8
end

sass_dir = "scss"
css_dir = "css"
fonts_dir = "fonts"
images_dir = "images"


http_path = "/"

