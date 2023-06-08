uniform vec2 u_resolution;
uniform float u_time;
uniform float u_freq;
uniform float u_speed;
uniform float u_clearity;
uniform float u_patern;
uniform float u_position;
uniform float u_miror;


vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(3.5, 0.5, 2.5);
    vec3 c = vec3(1.5, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);

    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 uv = (gl_FragCoord.xy * u_position- u_resolution.xy) / u_resolution.y * u_position;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);

    for (float i = 1.0; i < u_patern ; i++) {
        uv = fract(uv *abs( u_freq)) - u_miror;

        float d = length(sin(uv)) * exp(-length(uv0));

        vec3 col = palette(length(uv0) + i + u_patern * 1.4 + u_time * u_speed);

        d = sin(d *  u_clearity + abs(u_time) * u_speed) / 8.;
        d = abs(d);

        d = pow(0.01 / d, 2.2);

        finalColor += col * d + sin(d);
    }

    gl_FragColor = vec4(finalColor, 1.0);
}
