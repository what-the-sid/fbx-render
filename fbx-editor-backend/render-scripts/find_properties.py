import sys
import json

import io
from contextlib import redirect_stdout
import bpy


stdout = io.StringIO()

def get_scale_and_position(filepath):
    try:
        print("FilePath:::",filepath)
        with redirect_stdout(stdout):
            bpy.ops.wm.read_factory_settings(use_empty=True)

            # Load the FBX model
            bpy.ops.import_scene.fbx(filepath=filepath)
            obj = bpy.context.selected_objects[0]

            scale = obj.scale[:]
            position = obj.location[:]

            return {
                'scale': scale,
                'position': position
            }
    except Exception as e:
        return {'error': str(e)}

if __name__ == '__main__':
    # Get the filepath argument from the command line
    filepath = sys.argv[-1]

    # Call the get_scale_and_position function and print the result as JSON
    result = get_scale_and_position(filepath)
    print(json.dumps(result))
