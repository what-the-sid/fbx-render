import bpy
import sys
import argparse

def load_fbx(filepath):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.fbx(filepath=filepath)

def adjust_scale_and_position(scale, position):
    for obj in bpy.context.scene.objects:
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj
        bpy.context.object.scale = scale
        bpy.context.object.location = position

def subdivide_mesh(level):
    for obj in bpy.context.selected_objects:
        if obj.type == 'MESH':
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.mode_set(mode='EDIT')
            bpy.ops.mesh.subdivide(number_cuts=level)
            bpy.ops.object.mode_set(mode='OBJECT')

def unsubdivide_mesh(iterations):
    for obj in bpy.context.selected_objects:
        if obj.type == 'MESH':
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.mode_set(mode='EDIT')
            bpy.ops.mesh.unsubdivide(iterations=iterations)
            bpy.ops.object.mode_set(mode='OBJECT')

def export_glb(filepath):
    bpy.ops.export_scene.gltf(filepath=filepath)

def main():
    parser = argparse.ArgumentParser(description="FBX to GLB converter with modifications.")
    parser.add_argument("fbx_filepath", type=str, help="Path to the FBX file.")
    parser.add_argument("glb_filepath", type=str, help="Output path for the GLB file.")
    parser.add_argument("--scale", type=float, nargs=3, default=[1, 1, 1], help="Scale in x, y, z.")
    parser.add_argument("--position", type=float, nargs=3, default=[0, 0, 0], help="Position in x, y, z.")
    parser.add_argument("--subdivide", type=int, help="Level of subdivision to apply.")
    parser.add_argument("--unsubdivide", type=int, help="Number of iterations for unsubdivision.")
    args = parser.parse_args()

    print("Arguements:::",args)

    load_fbx(args.fbx_filepath)
    print("Loaded File")
    adjust_scale_and_position(tuple(args.scale), tuple(args.position))
    print("Adjusted Model")

    if args.subdivide:
        subdivide_mesh(args.subdivide)
    elif args.unsubdivide:
        unsubdivide_mesh(args.unsubdivide)

    export_glb(args.glb_filepath)

if __name__ == "__main__":
    main()
