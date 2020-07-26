const imageSelection = require('./imageSelection')

function normalize(nasa_data){

    const normalize_data = nasa_data.near_earth_objects.filter((asteroid) =>{
        return asteroid.close_approach_data.length > 0 && asteroid.orbital_data.orbit_class
    }).map((asteroid)=>{    
        return  {
            neo_reference_id: asteroid.neo_reference_id,
            name: asteroid.name,
            image: imageSelection(),
            absolute_magnitude_h: asteroid.absolute_magnitude_h,
            estimated_diameter : {
                kilometers : {
                    estimated_diameter_min : asteroid.estimated_diameter.kilometers.estimated_diameter_min,
                    estimated_diameter_max: asteroid.estimated_diameter.kilometers.estimated_diameter_max
                }
            },
            is_potentially_hazardous_asteroid : asteroid.is_potentially_hazardous_asteroid,
            close_approach_data : {
                close_approach_date : asteroid.close_approach_data[0].close_approach_date,
                epoch_date_close_approach : asteroid.close_approach_data[0].epoch_date_close_approach,
                relative_velocity: {
                    kilometers_per_hour : asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour
                },
                miss_distance: {
                    kilometers : asteroid.close_approach_data[0].miss_distance.kilometers
                },
            },
            orbital_data : {
                orbit_determination_date : asteroid.orbital_data.orbit_determination_date,
                minimum_orbit_intersection : asteroid.orbital_data.minimum_orbit_intersection,
                eccentricity : asteroid.orbital_data.eccentricity,
                semi_major_axis : asteroid.orbital_data.semi_major_axis,
                inclination : asteroid.orbital_data.inclination,
                orbital_period : asteroid.orbital_data.orbital_period,
                perihelion_distance : asteroid.orbital_data.perihelion_distance,
                aphelion_distance : asteroid.orbital_data.aphelion_distance,
                orbit_class: {
                    orbit_class_type : asteroid.orbital_data.orbit_class.orbit_class_type,
                    orbit_class_description : asteroid.orbital_data.orbit_class.orbit_class_description,
                    orbit_class_range : asteroid.orbital_data.orbit_class.orbit_class_range
                }
            }
        } 
    })
    return normalize_data
}

module.exports = normalize