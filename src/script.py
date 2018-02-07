#coding : uft-8

import os  
def getallfiles(dir_path):
    allfilelist = []
    g = os.walk(dir_path)  
    for path,d,filelist in g:
        for filename in filelist:  
            allfilelist.append(os.path.join(path, filename))
    return allfilelist

if __name__ == "__main__":
    files = getallfiles("../Resources/code")
    for name in files:
        print name
        # with open(name, 'r+') as f:
        #     content = f.read()        
        #     f.seek(0, 0)
        #     f.write('<pre>'+content+'</pre>')
        #     f.close()