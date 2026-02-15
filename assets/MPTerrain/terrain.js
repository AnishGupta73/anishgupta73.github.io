
/**
 * Given the source code of a vertex and fragment shader, compiles them,
 * and returns the linked program.
 */
function compileShader(vs_source, fs_source) {
    const vs = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vs, vs_source)
    gl.compileShader(vs)
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(vs))
        throw Error("Vertex shader compilation failed")
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fs, fs_source)
    gl.compileShader(fs)
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(fs))
        throw Error("Fragment shader compilation failed")
    }

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program))
        throw Error("Linking failed")
    }
    
    const uniforms = {}
    for(let i=0; i<gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); i+=1) {
        let info = gl.getActiveUniform(program, i)
        uniforms[info.name] = gl.getUniformLocation(program, info.name)
    }
    program.uniforms = uniforms

    return program
}

/**
 * Sends per-vertex data to the GPU and connects it to a VS input
 * 
 * @param data    a 2D array of per-vertex data (e.g. [[x,y,z,w],[x,y,z,w],...])
 * @param loc     the layout location of the vertex shader's `in` attribute
 * @param mode    (optional) gl.STATIC_DRAW, gl.DYNAMIC_DRAW, etc
 * 
 * @returns the ID of the buffer in GPU memory; useful for changing data later
 */
function supplyDataBuffer(data, loc, mode) {
    if (mode === undefined) mode = gl.STATIC_DRAW
    
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    const f32 = new Float32Array(data.flat())
    gl.bufferData(gl.ARRAY_BUFFER, f32, mode)
    
    gl.vertexAttribPointer(loc, data[0].length, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(loc)
    
    return buf;
}


function setupGeomery(gridsize, faults) {
    var triangleArray = gl.createVertexArray()
    gl.bindVertexArray(triangleArray)

    let n = gridsize

    // Vertex Positions

    // evenly spaced grid between -1 and 1:
    // 0 goes to -1
    // n-1 goes to 1
    // x = -1 + 2*(x/(n-1))
    // y = -1 + 2*(y/(n-1))
    vertices = []
    for (y = 0; y < n; y++) {
        const pos_y = -1 + 2*(y/(n-1))
        for (x = 0; x < n; x++) {
            const pos_x = -1 + 2*(x/(n-1))
            vertices.push([pos_x, pos_y, 0])
        }
    }

    // Faulting

    const fault_delta = 0.1
    let max_height = 0.0
    let min_height = 0.0

    for (f = 0; f < faults; f++) {
        let rand_x = Math.random()*2 - 1
        let rand_y = Math.random()*2 - 1
        point = [rand_x, rand_y]

        let rand_ang = Math.random()*Math.PI*2
        let surface_normal = [Math.cos(rand_ang), Math.sin(rand_ang), 0.0]


        for (let i = 0; i < vertices.length; i++) {
            vertex = vertices[i]
            b = [vertex[0], vertex[1]]
            let dot_prod = dot(sub(b, point), surface_normal)
            if (dot_prod >= 0.0) {
                vertex[2] += fault_delta
                max_height = Math.max(max_height, vertex[2])
            } else {
                vertex[2] -= fault_delta
                min_height = Math.min(min_height, vertex[2])
            }
        }
    }

    // normalize heights
    let c = 2.0
    for (let i = 0; i < vertices.length; i++) {
        vertex = vertices[i]
        vertex[2] = c * (vertex[2] - 0.5*(max_height + min_height)) / (max_height - min_height)

        // Sphere testing
        // let r = Math.pow(Math.pow(vertex[0], 2) + Math.pow(vertex[1], 2), 0.5)
        // if (r < 0.0) {
        //     vertex[2] = 0.0
        // } else {
        //     vertex[2] = Math.pow(1-Math.pow(r, 2), 0.5)
        // }
    }

    supplyDataBuffer(vertices, 0)


    // Triangle Indices

    // (jn+i, jn+i + 1, jn+i + n) and (jn+i+1, jn+i+n, jn+i+n+1)
    indices = []
    for (j = 0; j < n-1; j++) {
        for (i = 0; i < n-1; i++) {
            indices.push([j*n+i, j*n+i + 1, j*n+i + n])
            indices.push([j*n+i + 1, j*n+i + n, j*n+i + n+1])
        }
    }

    //indices = indices.flat()
    var indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices.flat()), gl.STATIC_DRAW)


    // Normals

    normals = []
    for (i = 0; i < vertices.length; i++) {
        normals.push([0, 0, 0])
    }
    
    // for each vertex,
    // get the north, south, east west.
    // consider off the edge should be put back onto the edge.
    // (n-s) x (w-e)
    for (j = 0; j < vertices.length; j++) {
        
        // top edge
        let n_idx = j
        if (j >= n) {
            n_idx = j-n
        }
        let north = vertices[n_idx]

        // bottom edge
        let s_idx = j
        if (j+n < n*n) {
            s_idx = j+n
        }
        let south = vertices[s_idx]

        // right edge
        let e_idx = j
        if ((j+1) % n != 0) {
            e_idx = j+1
        }
        let east = vertices[e_idx]

        // left edge
        let w_idx = j
        if (j % n != 0) {
            w_idx = j-1
        }
        let west = vertices[w_idx]

        let e1 = sub(north, south)
        let e2 = sub(west, east)

        let normal_vec = cross(e2, e1)// this way seemed to work better

        normals[j] = normalize(normal_vec)
    }

    supplyDataBuffer(normals, 1)


    return {
        mode: gl.TRIANGLES,
        count: indices.flat().length,
        type: gl.UNSIGNED_SHORT,
        vao: triangleArray
    }
}


function draw(seconds) {
    //gl.clearColor(...IlliniBlue)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(program)

    gl.bindVertexArray(geom.vao)

    let Yellow = new Float32Array([252/255, 186/255, 50/255, 1])
    gl.uniform4fv(program.uniforms.color, Yellow)

    // Lighting
    let ld = normalize([-1, -2, 5])
    let h = normalize(add(ld, [0, 0, 1]))
    gl.uniform3fv(program.uniforms.lightdir, ld)
    gl.uniform3fv(program.uniforms.lightcolor, [1, 1, 1])
    gl.uniform3fv(program.uniforms.halfway, h)


    // View
    let m = m4mul(m4rotZ(seconds*0.5))
    let v = m4view([0,-3,2], [0,0,0], [0,1,0])
    gl.uniformMatrix4fv(program.uniforms.mv, false, m4mul(v,m))
    gl.uniformMatrix4fv(program.uniforms.p, false, p)

    gl.drawElements(geom.mode, geom.count, geom.type, 0)


}

function tick(milliseconds) {
    let seconds = milliseconds / 1000;

    draw(seconds)
    requestAnimationFrame(tick)
}

function fillScreen() {
    let canvas = document.querySelector('canvas')
    document.body.style.margin = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    canvas.style.width = ''
    canvas.style.height = ''
    gl.viewport(0,0, canvas.width, canvas.height)
    // TO DO: compute a new projection matrix based on the width/height aspect ratio
    if (window.gl) {
        window.p = m4perspNegZ(0.1, 10, 1, canvas.width, canvas.height)
    }
}

function generateGrid(size) {

}

/** Compile, link, set up geometry */
window.addEventListener('load', async (event) => {
    window.gl = document.querySelector('canvas').getContext('webgl2',
        // optional configuration object: see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
        {antialias: false, depth:true, preserveDrawingBuffer:true}
    )
    let vs = `#version 300 es

    layout(location=0) in vec4 position;
    layout(location=1) in vec3 normals;
    
    uniform mat4 mv;
    uniform mat4 p;
    
    uniform vec3 normal;
    
    out vec3 vnormal;
    
    void main() {
        gl_Position = p * mv * position;
        vnormal = normals;
    }
    `;

    let fs = `#version 300 es
    precision highp float;
    
    uniform vec4 color;
    
    out vec4 fragColor;
    
    uniform vec3 lightdir;
    uniform vec3 lightcolor;
    uniform vec3 halfway;
    
    in vec3 vnormal;
    
    void main() {
        vec3 n = normalize(vnormal);
        float lambert = max(dot(n, lightdir), 0.0);
        float blinn = pow(max(dot(n, halfway), 0.0), 400.0);
    
        fragColor = vec4(
            color.rgb*(lightcolor*lambert)
            +
            (lightcolor*blinn)*1.0
        , color.a);
    }
    `;
    
    window.program = compileShader(vs,fs)
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    

    fillScreen()
    window.addEventListener('resize', fillScreen)

    document.querySelector('#submit').addEventListener('click', event => {
        const gridsize = Number(document.querySelector('#gridsize').value) || 2
        const faults = Number(document.querySelector('#faults').value) || 0
        // TO DO: generate a new gridsize-by-gridsize grid here, then apply faults to it
        window.geom = setupGeomery(gridsize, faults)

        requestAnimationFrame(tick)
    })
})